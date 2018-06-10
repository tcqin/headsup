var ActionEnum = {
	FOLD: 1,
	CHECK: 2,
	CALL: 3,
	RAISE: 4
}

function ActionModel(action, number) {
	this.action = action;
	this.number = number;

	if (this.action === ActionEnum.CALL || this.action ==== ActionEnum.RAISE) {
		if !(this.number > 0) {
			console.log("action number needs to be positive")
		}
	}
}