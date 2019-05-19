import {IMapInfo} from 'domain/IMapInfo';
import {IPoint} from 'domain/IPoint';
import * as L from 'leaflet';
import {Map} from 'leaflet';
import * as React from 'react';
import {ReactElement, ReactNode, RefObject} from 'react';
import styles from './LMap.scss';

interface IRMapProps {
    children?: ReactNode;
    mapInfo?: IMapInfo;
    onViewSet?: (center: IPoint) => void;
}

interface IRMapState {
    initialized: boolean;
}

export class LMap extends React.Component<IRMapProps, IRMapState> {
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

            // Грубо, но времени уже мало
            setTimeout(() => {
                if (this.props.onViewSet) {
                    this.props.onViewSet(this.map.getCenter());
                }
            }, 1500);
        }
    }

    public componentDidUpdate(prevProps: IRMapProps) {
        const prevPos = prevProps.mapInfo && prevProps.mapInfo.position;
        const newPos = this.props.mapInfo && this.props.mapInfo.position;
        if (prevPos !== newPos && newPos) {
            this.map.setView(newPos, this.map.getZoom());
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
