import * as L from 'leaflet';
import {Map} from 'leaflet';
import * as React from 'react';
import {ReactElement, ReactNode, RefObject} from 'react';
import styles from './RMap.scss';

interface IRMapProps {
    children?: ReactNode;
    defaultZoom?: number;
}

interface IRMapState {
    initialized: boolean;
}

export class RMap extends React.Component<IRMapProps, IRMapState> {
    private readonly mapRef: RefObject<HTMLDivElement>;
    private map: Map;

    public state: IRMapState = {
        initialized: false,
    };

    public constructor(props: IRMapProps) {
        super(props);
        this.mapRef = React.createRef();
    }

    public componentDidMount() {
        if (this.mapRef && this.mapRef.current) {
            this.map = L.map(this.mapRef.current);
            this.setState({initialized: true});
        }
    }

    public componentWillUnmount() {
        this.map.remove();
    }

    public render() {
        const {initialized} = this.state;
        const {children} = this.props;

        // Inject map into children
        const childrenWithMap = React.Children.map(
            children,
            (child: ReactElement) => React.cloneElement(child, {...child.props, map: this.map}),
        );

        return (
            <>
                <div className={styles.map} ref={this.mapRef}/>
                {initialized && childrenWithMap}
            </>
        );
    }
}
