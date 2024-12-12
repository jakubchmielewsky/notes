export interface NoteType {
    id: string;
    uid: string;
    title: string;
    tags: string[];
    text: string;
    lastEdited: Date;
    archived: boolean;
}