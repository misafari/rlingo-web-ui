import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  Search,
  Globe,
  Languages,
  Check,
} from "lucide-react";
import type Locale from "../../../types/locales/Locale.model";

type TranslationManagerProps = {
  locales: Locale[];
};

const TranslationManager = ({ locales }: TranslationManagerProps) => {
  const [isManagingLocales, setIsManagingLocales] = useState(false);
  const [newLocale, setNewLocale] = useState("");
  const [translations, setTranslations] = useState({
    "welcome.title": {
      en: "Welcome",
      es: "Bienvenido",
      fr: "Bienvenue",
      de: "Willkommen",
      ja: "ようこそ",
    },
    "welcome.subtitle": {
      en: "Get started now",
      es: "Comienza ahora",
      fr: "Commencez maintenant",
      de: "Jetzt starten",
      ja: "今すぐ始める",
    },
    "nav.home": {
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
      de: "Startseite",
      ja: "ホーム",
    },
    "nav.about": {
      en: "About",
      es: "Acerca de",
      fr: "À propos",
      de: "Über uns",
      ja: "約",
    },
    "nav.contact": {
      en: "Contact",
      es: "Contacto",
      fr: "Contact",
      de: "Kontakt",
      ja: "連絡先",
    },
    "button.submit": {
      en: "Submit",
      es: "Enviar",
      fr: "Soumettre",
      de: "Absenden",
      ja: "送信",
    },
    "button.cancel": {
      en: "Cancel",
      es: "Cancelar",
      fr: "Annuler",
      de: "Abbrechen",
      ja: "キャンセル",
    },
    "error.required": {
      en: "This field is required",
      es: "Este campo es obligatorio",
      fr: "Ce champ est requis",
      de: "Dieses Feld ist erforderlich",
      ja: "この項目は必須です",
    },
  });

  const [selectedKey, setSelectedKey] = useState("welcome.title");
  const [editingValues, setEditingValues] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValues, setNewValues] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredKeys = Object.keys(translations).filter(
    (key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(translations[key]).some((val) =>
        val.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const startEdit = () => {
    setIsEditing(true);
    setEditingValues({ ...translations[selectedKey] });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingValues({});
  };

  const saveEdit = () => {
    if (selectedKey) {
      setTranslations((prev) => ({
        ...prev,
        [selectedKey]: editingValues,
      }));
      setIsEditing(false);
      setEditingValues({});
    }
  };

  const deleteKey = () => {
    if (window.confirm(`Are you sure you want to delete "${selectedKey}"?`)) {
      const newTranslations = { ...translations };
      delete newTranslations[selectedKey];
      setTranslations(newTranslations);
      const keys = Object.keys(newTranslations);
      if (keys.length > 0) {
        setSelectedKey(keys[0]);
      } else {
        setSelectedKey(null);
      }
    }
  };

  const startAdd = () => {
    setIsAdding(true);
    setNewKey("");
    const initialValues = {};
    locales.forEach((locale) => {
      initialValues[locale] = "";
    });
    setNewValues(initialValues);
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setNewKey("");
    setNewValues({});
  };

  const saveAdd = () => {
    if (newKey.trim() && !translations[newKey]) {
      setTranslations((prev) => ({
        ...prev,
        [newKey]: newValues,
      }));
      setSelectedKey(newKey);
      setIsAdding(false);
      setNewKey("");
      setNewValues({});
    } else if (translations[newKey]) {
      alert("Key already exists!");
    }
  };

  const updateEditValue = (locale, value) => {
    setEditingValues((prev) => ({
      ...prev,
      [locale]: value,
    }));
  };

  const updateNewValue = (locale, value) => {
    setNewValues((prev) => ({
      ...prev,
      [locale]: value,
    }));
  };

  const addLocale = () => {
    const code = newLocale.trim().toLowerCase();
    if (code && !locales.includes(code)) {
      setLocales((prev) => [...prev, code]);
      // Add empty values for the new locale in all existing translations
      const updatedTranslations = {};
      Object.keys(translations).forEach((key) => {
        updatedTranslations[key] = {
          ...translations[key],
          [code]: "",
        };
      });
      setTranslations(updatedTranslations);
      setNewLocale("");
    } else if (locales.includes(code)) {
      alert("Locale already exists!");
    }
  };

  const removeLocale = (localeToRemove) => {
    if (locales.length <= 1) {
      alert("Cannot remove the last locale!");
      return;
    }
    if (
      window.confirm(
        `Remove "${localeToRemove}" locale? All translations for this locale will be deleted.`
      )
    ) {
      setLocales((prev) => prev.filter((l) => l !== localeToRemove));
      // Remove the locale from all translations
      const updatedTranslations = {};
      Object.keys(translations).forEach((key) => {
        const newValues = { ...translations[key] };
        delete newValues[localeToRemove];
        updatedTranslations[key] = newValues;
      });
      setTranslations(updatedTranslations);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-indigo-600" />
          <h1 className="text-xl font-semibold text-gray-900">
            Translation Manager
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsManagingLocales(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
          >
            <Languages className="w-4 h-4" />
            Manage Locales
          </button>
          <div className="text-sm text-gray-600">
            {Object.keys(translations).length} keys • {locales.length} locales
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Key List */}
        <div className="w-80 bg-white border-r flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search keys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Add Button */}
          <div className="p-4 border-b">
            <button
              onClick={startAdd}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Translation Key
            </button>
          </div>

          {/* Key List */}
          <div className="flex-1 overflow-y-auto">
            {filteredKeys.map((key) => (
              <div
                key={key}
                onClick={() => {
                  if (!isEditing && !isAdding) {
                    setSelectedKey(key);
                  }
                }}
                className={`px-4 py-3 border-b cursor-pointer transition-colors ${
                  selectedKey === key
                    ? "bg-indigo-50 border-l-4 border-l-indigo-600"
                    : "hover:bg-gray-50 border-l-4 border-l-transparent"
                }`}
              >
                <div className="font-medium text-sm text-gray-900 mb-1">
                  {key}
                </div>
                <div className="text-xs text-gray-600 truncate">
                  {translations[key].en}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Detail Panel */}
        <div className="flex-1 flex flex-col bg-white">
          {isManagingLocales ? (
            // Manage Locales Panel
            <div className="flex-1 flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Manage Locales
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Add or remove translation locales
                  </p>
                </div>
                <button
                  onClick={() => setIsManagingLocales(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl">
                  {/* Add New Locale */}
                  <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Add New Locale
                    </h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newLocale}
                        onChange={(e) => setNewLocale(e.target.value)}
                        placeholder="e.g., pt, it, zh"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onKeyPress={(e) => e.key === "Enter" && addLocale()}
                      />
                      <button
                        onClick={addLocale}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Enter a locale code (e.g., en, es, fr)
                    </p>
                  </div>

                  {/* Existing Locales */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Current Locales
                    </h3>
                    <div className="space-y-2">
                      {locales.map((locale) => (
                        <div
                          key={locale}
                          className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                        >
                          <div>
                            <div className="font-semibold text-gray-900">
                              {locale.toUpperCase()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {getLocaleName(locale)}
                            </div>
                          </div>
                          <button
                            onClick={() => removeLocale(locale)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isAdding ? (
            // Add New Key Panel
            <div className="flex-1 flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  New Translation Key
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={cancelAdd}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveAdd}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Create Key
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Translation Key *
                    </label>
                    <input
                      type="text"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      placeholder="e.g., button.login or nav.home"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Use dot notation for nested keys
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Languages className="w-4 h-4" />
                      Translations
                    </h3>
                    {locales.map((locale) => (
                      <div key={locale}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {locale.toUpperCase()} - {getLocaleName(locale)}
                        </label>
                        <input
                          type="text"
                          value={newValues[locale] || ""}
                          onChange={(e) =>
                            updateNewValue(locale, e.target.value)
                          }
                          placeholder={`Translation for ${locale}`}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : selectedKey ? (
            // View/Edit Key Panel
            <div className="flex-1 flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedKey}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Translation key details
                  </p>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={deleteKey}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                      <button
                        onClick={startEdit}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl space-y-6">
                  {locales.map((locale) => (
                    <div key={locale} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-gray-900">
                          {locale.toUpperCase()}
                        </label>
                        <span className="text-xs text-gray-500">
                          {getLocaleName(locale)}
                        </span>
                      </div>
                      {isEditing ? (
                        <textarea
                          value={editingValues[locale] || ""}
                          onChange={(e) =>
                            updateEditValue(locale, e.target.value)
                          }
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        />
                      ) : (
                        <div className="text-gray-900 bg-white px-4 py-3 rounded-lg border border-gray-200">
                          {translations[selectedKey][locale] || (
                            <span className="text-gray-400 italic">
                              No translation
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Empty State
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Languages className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Select a key to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function getLocaleName(code) {
  const names = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    ja: "Japanese",
  };
  return names[code] || code;
}

export default TranslationManager;
