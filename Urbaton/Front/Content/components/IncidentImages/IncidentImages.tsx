import {IImage} from 'domain/IImage';
import * as React from 'react';
import styles from './IncidentImages.scss';

interface IIncidentImagesProps {
    images: IImage[];
}

export class IncidentImages extends React.Component<IIncidentImagesProps> {
    public render() {
        const {images} = this.props;

        return (
            <ul className={styles.photos}>
                {(images || []).map(({link}) => (
                    <li key={link} className={styles.photo}>
                        <img src={link} alt="Фотография инцидента"/>
                    </li>
                ))}
            </ul>
        );
    }
}
