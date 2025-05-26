
// Sistema de armazenamento local usando localStorage como fallback
class LocalStorage {
  private storageKey = 'autism-plus-data';

  private getData(): any {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  private setData(data: any): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }

  get<T>(key: string): T | null {
    const data = this.getData();
    return data[key] || null;
  }

  set<T>(key: string, value: T): void {
    const data = this.getData();
    data[key] = value;
    this.setData(data);
  }

  remove(key: string): void {
    const data = this.getData();
    delete data[key];
    this.setData(data);
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const storage = new LocalStorage();
