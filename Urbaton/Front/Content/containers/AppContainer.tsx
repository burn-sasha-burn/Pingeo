import {App} from 'components/App/App';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GeneralThunkDispatch, IGeneralGetState} from 'utils/store/actionTypes';

const mapStateToProps = (state: IGeneralGetState) => ({});
const mapDispatchToProps = (dispatch: GeneralThunkDispatch) => bindActionCreators({}, dispatch);

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
