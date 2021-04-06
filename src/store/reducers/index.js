import { combineReducers } from 'redux';
import listreducer from './WorkorderlistReducer';
import Descriptionreducer from './DescriptionReducer';

export default combineReducers({
  workOrders: listreducer,
  won: Descriptionreducer
});
