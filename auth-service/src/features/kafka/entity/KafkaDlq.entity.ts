import { PrimaryTextColumn, TextColumn, TimestampColumn } from '@/src/utils/entites.decorator';
import { Entity } from 'typeorm';

@Entity({ name: 'kafka_dlq', schema: 'instagram' })
export class KafkaDlqEntity {
    @PrimaryTextColumn()
    id!: string;

    @TextColumn({ name: 'topic', nullable: false })
    topic!: string;

    @TextColumn({ name: 'message', nullable: false })
    message!: string;

    @TextColumn({ name: 'error', nullable: false })
    error!: string;

    @TimestampColumn({ name: 'timestamp' })
    timestamp!: Date;

    @TextColumn({ name: 'status', nullable: false })
    status!: string;
}
