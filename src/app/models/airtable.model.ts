// interfaces to manage airtable get requests

import { Property } from "./property.model";


export interface Field {
	description: string;
	size: number;
	name: string;
	sizeUnit: Property['sizeUnit'];
}

export interface Record {
	id: string;
	createdTime: string;
	fields: Field;
}

export interface getProperties {
	records: Record[];
}

// interfaces to manage airtable post requests

export interface postPropertyReqestBody {
	fields: Field;
}

// interface to manage delete requests
export interface deleteResponse {
	deleted: boolean;
	id: string;
}