export default interface ICacheProvider{
  save(key: string, value: string): Promise<void>;
  recover(key: string): Promise<string>;
  invalidade(key: string): Promise<void>;
}
