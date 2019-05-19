import * as React from 'react';
import styles from './IncidentImage.scss';

interface IIncidentImagesProps {
    fileId: string;
}

export function IncidentImage({fileId}: IIncidentImagesProps) {
    return <img className={styles.photo} src={`/api/files?fileId=${fileId}`} alt="Фотография инцидента"/>;
}
