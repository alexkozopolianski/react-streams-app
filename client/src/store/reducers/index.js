import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import channelReducer from "./channelReducer";
import chatReducer from "./chatReducer";
import dataReducer from "./dataReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  channels: channelReducer,
  data: dataReducer,
  chat: chatReducer,
});
