export default class Locale {
  public id?: string;
  public projectId: string;
  public locale: string;
  public isDefault: boolean;

  constructor(prev?: Locale) {
    this.id = prev?.id ?? undefined;
    this.projectId = prev?.projectId ?? "";
    this.locale = prev?.locale ?? "";
    this.isDefault = prev?.isDefault ?? false;
  }
}
