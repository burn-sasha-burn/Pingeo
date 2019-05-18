import CloseIcon from '@skbkontur/react-icons/Delete';
import MenuIcon from '@skbkontur/react-icons/Menu';
import cn from 'classnames';
import {push} from 'connected-react-router';
import {ControlPosition} from 'leaflet';
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {pathInfoSelector} from 'store/selectors/routeSelectors';
import {incidentsRoute, Page, pagesInfo} from 'utils/constants/routesConstants';
import {buildPageRoute} from 'utils/routeBuilders';
import styles from './OptionsBar.scss';

interface IOptionsBarProps {
    position: ControlPosition;
    selectedPage: Page;
    onPageSelect?: (route: string) => void;
}

interface IOptionsBarState {
    opened: boolean;
}

export class OptionsBarComponent extends React.Component<IOptionsBarProps, IOptionsBarState> {
    public static defaultProps: Partial<IOptionsBarProps> = {
        position: 'topright',
        selectedPage: incidentsRoute,
        onPageSelect: () => '',
    };
    public state: IOptionsBarState = {
        opened: false,
    };

    public componentDidMount() {
        document.addEventListener('keyup', this.handleEscKey);
    }

    public componentWillUnmount() {
        document.removeEventListener('keyup', this.handleEscKey);
    }

    public render() {
        const {opened} = this.state;
        const {position, selectedPage} = this.props;

        return (
            <div className={cn(styles.root, styles[position] || styles.topright, opened && styles.opened)}>
                <button className={styles.menuButton} onClick={this.toggle}>
                    <div className={styles.open}><MenuIcon/></div>
                    <div className={styles.close}><CloseIcon/></div>
                </button>
                <ul className={cn(styles.menu, styles[position] || styles.topright)}>
                    {pagesInfo.map(({page, title}) => (
                        <li key={page} className={cn(styles.item, page === selectedPage && styles.selected)}>
                            <button onClick={() => this.selectPage(page)}>{title}</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    private readonly toggle = () => this.setState(({opened}) => ({opened: !opened}));
    private readonly selectPage = (page: Page) => {
        if (this.props.selectedPage !== page) {
            this.props.onPageSelect(buildPageRoute(page));
        }
        this.setState({opened: false});
    }

    private readonly handleEscKey = (e: KeyboardEvent) => {
        if (this.state.opened && (e.code === 'Escape' || e.code === 'Esc' || e.keyCode === 27)) {
            this.setState({opened: false});
        }
    }
}

const mapStateToProps = (state: IGeneralObject) => ({
    selectedPage: pathInfoSelector(state).page,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onPageSelect: push,
}, dispatch);
export const OptionsBar = connect(mapStateToProps, mapDispatchToProps)(OptionsBarComponent);
