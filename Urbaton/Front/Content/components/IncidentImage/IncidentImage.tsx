import {IImage} from 'domain/IImage';
import * as React from 'react';
import styles from './IncidentImage.scss';

interface IIncidentImagesProps {
    image: IImage;
}

export function IncidentImage({image}: IIncidentImagesProps) {
    return <img className={styles.photo} src={`/api/files?fileId=${image.fileId}`} alt="Фотография инцидента"/>;
}
