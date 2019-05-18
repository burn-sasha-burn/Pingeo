import CloseIcon from '@skbkontur/react-icons/Delete';
import MenuIcon from '@skbkontur/react-icons/Menu';
import cn from 'classnames';
import {push} from 'connected-react-router';
import {ControlPosition} from 'leaflet';
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import DropdownMenu from 'retail-ui/components/DropdownMenu/DropdownMenu';
import MenuItem from 'retail-ui/components/MenuItem/MenuItem';
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
                <DropdownMenu
                    caption={
                        <button className={styles.menuButton}>
                            <div className={styles.open}><MenuIcon size={32}/></div>
                            <div className={styles.close}><CloseIcon size={26}/></div>
                        </button>
                    }
                    onOpen={this.handleMenuOpen}
                    onClose={this.handleMenuClose}
                    disableAnimations={false}
                    menuWidth="200px"
                >
                    {pagesInfo.map(({page, title}) => (
                        <MenuItem
                            key={page}
                            onClick={() => this.selectPage(page)}
                            disabled={selectedPage === page}
                        >
                            <span className={styles.pageName}>{title}</span>
                        </MenuItem>
                    ))}
                </DropdownMenu>
            </div>
        );
    }

    private readonly handleMenuOpen = () => this.setState({opened: true});
    private readonly handleMenuClose = () => this.setState({opened: false});
    private readonly selectPage = (page: Page) => {
        if (this.props.selectedPage !== page) {
            this.props.onPageSelect(buildPageRoute(page));
        }
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
