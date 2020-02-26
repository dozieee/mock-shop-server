// model
import model from './models';
// buildMakeMockShop factory
import buildMakeMockShop from './mock-shop';
// build the makeMockShop factory with the model as a dependcy
const makeMockShop = buildMakeMockShop({ Model: model });

export default makeMockShop;
