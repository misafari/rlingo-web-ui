export interface CreateNewTranslationLocale {
  locale_id: string;
  value: string;
}

export interface CreateNewTranslation {
  projectId: string;
  key: string;
  locales: CreateNewTranslationLocale[];
}

export class CreateNewTranslationUsecaseRequest
  implements CreateNewTranslation
{
  public projectId: string;
  public key: string;
  public locales: CreateNewTranslationLocale[];

  constructor(
    projectId: string,
    key: string,
    locales: CreateNewTranslationLocale[]
  ) {
    this.projectId = projectId;
    this.key = key;
    this.locales = locales ?? [];
  }

  public validate(): void {
    if (!this.projectId) {
      throw new Error("Project ID is required");
    }
    if (!this.key) {
      throw new Error("Key is required");
    }
    if (!this.locales || this.locales.length === 0) {
      throw new Error("Locales are required");
    }
  }
}
