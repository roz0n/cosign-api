import pusherOptions from "./helpers/pusherOptions";

const Pusher = require("pusher");
const client = new Pusher(pusherOptions);

export default client;
