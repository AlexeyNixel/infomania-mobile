import {Routes} from "@/api/routes";
import {axiosApi} from "@/api/axios";
import type {ParamsType} from "@/models/baseModels";

const {MAIN_SLIDER_ROUTE} = Routes;

export const findSlides = async (params: ParamsType) => {
    const {data} = await axiosApi.get(MAIN_SLIDER_ROUTE, {params})
    return data;
}