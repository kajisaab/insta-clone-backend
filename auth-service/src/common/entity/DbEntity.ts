import {
    BooleanColumn,
    JsonbColumn,
    PrimaryTextColumn,
    TimestampColumn,
} from '@/src/utils/entites.decorator';
import { LabelValuePair } from '../dto/labelValuePair';
import { Entity } from 'typeorm';

@Entity()
export abstract class DbEntity {
    @PrimaryTextColumn()
    id!: string;

    @BooleanColumn({ name: 'is_deleted', default: false })
    isDeleted: boolean = false;

    @JsonbColumn({ name: 'created_by' })
    createdBy!: LabelValuePair;

    @TimestampColumn({ name: 'created_date_time', type: 'timestamp' })
    createdDateTime!: Date;

    @JsonbColumn({ name: 'last_modified_by' })
    lastModifiedBy: LabelValuePair | null = null;

    @TimestampColumn({ name: 'last_modified_date_time' })
    lastModifiedDateTime: Date | null = null;
}
