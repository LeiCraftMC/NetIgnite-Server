import { DBStorage } from '~/server/db';
import { UserAuthInfo } from '~/server/utils/auth/handler';

export default defineEventHandler(async (event) => {

    const userinfo = event.context.userinfo as UserAuthInfo;
    if (!userinfo) return;

    const result = await DBStorage.Devices.getAllByOwnerID(userinfo.userID);
    setResponseStatus(event, 200);

    if (!result) {
        setResponseStatus(event, 500);
        return { status: "ERROR", message: "Failed to retrieve devices." , data: null };
    }

    return { status: "OK", data: result};
});