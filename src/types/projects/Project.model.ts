class Project {
    public id?: string;
    public name: string;

    constructor(prev?: Project) {
        this.id = prev?.id ?? undefined;
        this.name = prev?.name ?? '';
    }
}

export default Project;
