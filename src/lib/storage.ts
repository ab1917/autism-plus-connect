
// Sistema de armazenamento local usando localStorage como fallback
class LocalStorage {
  private storageKey = 'autism-plus-data';

  private getData(): any {
    try {
      const data = localStorage.getItem(this.storageKey);
      const parsed = data ? JSON.parse(data) : {};
      console.log('Getting data from localStorage:', parsed);
      return parsed;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return {};
    }
  }

  private setData(data: any): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(this.storageKey, serialized);
      console.log('Data saved to localStorage:', data);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }

  get<T>(key: string): T | null {
    const data = this.getData();
    const value = data[key] || null;
    console.log(`Getting ${key} from storage:`, value);
    return value;
  }

  set<T>(key: string, value: T): void {
    const data = this.getData();
    data[key] = value;
    this.setData(data);
    console.log(`Setting ${key} in storage:`, value);
  }

  remove(key: string): void {
    const data = this.getData();
    delete data[key];
    this.setData(data);
    console.log(`Removed ${key} from storage`);
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
    console.log('Storage cleared');
  }
}

export const storage = new LocalStorage();
