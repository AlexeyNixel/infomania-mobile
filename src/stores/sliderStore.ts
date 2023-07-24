import {defineStore} from "pinia";
import type {ParamsType} from "@/models/baseModels";
import {findSlides} from "@/api/sliderApi";

export const useSliderStore = defineStore('slider', () => {
    const getSlides = async (params?: ParamsType) => {
        const {data} = await findSlides(params!)
        return data
    }
    return {
        getSlides,
    }
})