/**
 * typescript d.ts file for fis3
 */
declare module fis {

	export const project = {
		currentMedia: () : string 
  };
	export const log = {
		info: (msg: string) : string ;
		warn: (msg: string) : string ;
  };
  
  export const util = {
    isFile: (path:string) : boolean ;
    copy : (rSource:string, target:string);
  };
  
	export function get(key: string): any;
	export function set(key: string, value: string): void;
	export function unhook(name: string, options?: any): void;
	export function hook(name: string, options?: any): void;
	export function plugin(name: string, options?: any): void;

	/**
	 * 设置规则的配置接口
	 * @param selector FIS3 把匹配文件路径的路径作为selector，匹配到的文件会分配给它设置的 props。关于 selector 语法，请参看 Glob 说明
	 * @param props 编译规则属性，包括文件属性和插件属性，更多属性
	 */
	export function match(selector: string | RegExp, props?: any): fis;

	/**
	 * 接口提供多种状态功能，比如有些配置是仅供开发环境下使用，有些则是仅供生产环境使用的。
	 * @param name
	 */
	export function media(name: string): fis;

	/**
	 * 加载插件
	 * @param name
	 * @param props
	 */
	export function plugin(name: string, props: {}): plugin | [plugin];

	export function on(eventName: string, callback: (e: Event) => void): void;

	export function time(dateStr: string): void;
}
