import {BasePipe, EfficientPipe, WorkflowOutput} from "@stable-canvas/comfyui-client";

type BasePipeConstructor = new (...args: any[]) => BasePipe;

export function withFetchFix(BaseClass: BasePipeConstructor): BasePipeConstructor {
    return class extends BaseClass {
        protected override async read_response(res: WorkflowOutput<unknown>): Promise<{ data: ArrayBuffer; mime: string; }[]> {
            const images: Array<{data: ArrayBuffer; mime: string;}> = [];

            for(const img of res.images) {
                switch(img.type) {
                    case 'buff': {
                        images.push({data: img.data, mime: img.mime});
                        break;
                    }
                    case 'url': {
                        const { data: url } = img;
                        const resp = await (this.context.client?.fetch ?? fetch)(url);
                        const mime = resp.headers.get("content-type") ?? "image/png";
                        const blob = await resp.blob();

                        images.push({data: await blob.arrayBuffer(), mime});
                        break;
                    }
                }
            }

            return images;
        }
    };
}

export const FetchFixedBasePipe = withFetchFix(BasePipe);
export const FetchFixedEfficientPipe = withFetchFix(EfficientPipe);