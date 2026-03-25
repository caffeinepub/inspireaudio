import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Story {
    title: string;
    description: string;
    audioUrl: string;
    author: string;
    durationSeconds: bigint;
    category: string;
}
export interface backendInterface {
    getAllCategories(): Promise<Array<string>>;
    getAllStories(): Promise<Array<Story>>;
    getFeaturedStory(): Promise<Story>;
    getMotivationalQuote(): Promise<string>;
    getStoriesByCategory(category: string): Promise<Array<Story>>;
    getStoryByTitle(title: string): Promise<Story>;
    setMotivationalQuote(quote: string): Promise<void>;
}
