import api from 'app/api';
import Axios from 'axios';

export const S3_LINK = 'https://esport-hatcher.s3.eu-west-3.amazonaws.com';

interface IUploadable {
    // tslint:disable-next-line: no-any
    file: any;
    name: string;
}
export const uploadFile = async (params: IUploadable) => {
    const { name, file } = params;

    const {
        data: { url },
    } = await api.get(`/upload?key=${name}&type=${file.type}`);
    await Axios.put(url, file, {
        headers: {
            'Content-Type': file.type,
        },
    });
};
