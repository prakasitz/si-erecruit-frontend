import { btnShowOnJob, btnShowWstatus } from "~/utils/types"
import { buttonShow } from "~/utils/default"
import { defineStore } from 'pinia'


export const useJobComponentStore = defineStore('JobComponent', {
    state: (): JobComponentState => {
        return {
            buttonShow: {
                BtnHeaderJob: false,
                BtnDeleteJob: false,
                BtnPublishedJob: false,
                BtnRepublished: false,
                BtnCancelledJob: false,
                BtnSuspendJob: false,
                BtnVerifyJob: false,
                BtnApproveJob: false,
                BtnTerminated: false,

                BtnDMS: false,
                BtnExport: false,
                BtnSuspend: false,
                BtnPublishable: false,
                BtnSendSAP: false,
            }
        }
    },
    actions: {
        setButtonShow(status: number) {
            this.buttonShow = {
                BtnHeaderJob: false,
                BtnDeleteJob: false,
                BtnPublishedJob: false,
                BtnRepublished: false,
                BtnCancelledJob: false,
                BtnSuspendJob: false,
                BtnVerifyJob: false,
                BtnApproveJob: false,
                BtnTerminated: false,

                BtnDMS: false,
                BtnExport: false,
                BtnSuspend: false,
                BtnPublishable: false,
                BtnSendSAP: false
            }
            buttonShow.map((item: btnShowWstatus) => {
                if (item.status == status) {
                    this.buttonShow = item.btn_show
                }
            });

        }
    }
})

export interface JobComponentState {
    buttonShow: btnShowOnJob
}
