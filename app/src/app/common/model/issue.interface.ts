export interface Issue {
    id: string;
    key: string;
    fields: Fields
}

interface Fields {
    summary: string;
    issuelinks: Issuelink[];
}

interface Issuelink {
    id: number;
    self: string;
    type: Type;
    inwardissue: InwardIssue;
}

interface Type {
    id: number;
    name: string;
    inward: string;
    outward: string;
    self: string;
}

interface InwardIssue {
    id: number;
    key: string;
    self: string;
}
