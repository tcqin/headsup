var ActionEnum = {
	FOLD: 1,
	CHECK: 2,
	CALL: 3,
	RAISE: 4
}

function Action(action, value) {
	this.action = action;
	this.value = value;

	if (this.action === ActionEnum.CALL || this.action === ActionEnum.RAISE) {
		if (!this.value > 0) {
			console.log("action number needs to be positive")
		}
	}

	this.equals = function(that) {
		return (this.action === that.action && this.value === that.value);
	}
}

function HandModel(bb, BU_username, BB_username, BU_stack, BB_stack) {

	this.bb = bb
	this.BU_username = BU_username;
	this.BB_username = BB_username;
    this.BU_stack = BU_stack;
    this.BB_stack = BB_stack;
    this.pot = bb*1.5;
    this.action_history = [];

    this.update = function(new_hand) {
    	// check action_history for the new actions
    	if (new_hand.action_history.length < this.action_history.length) {
    		console.log("hand history is older");
    	}
		for (var i = 0; i < this.action_history.length; i++) {
			action_new = new_hand.action_history[i]
			action_old = this.action_history[i]
			if (!action_new.equals(action_old)) {
				console.log("action histories diverged");
			}
    	}

    	// apply new actions onto current hand
    	for (var i = this.action_history.length; i < new_hand.action_history.length; i++) {
    		this.perform_action(new_hand.action_history[i]);
    	}

    	// check if consistent with new_hand
    	if (!this.bb === new_hand.bb) {
    		console.log("bb mismatch");
    	}
    	if (!this.BU_username === new_hand.BU_username) {
    		console.log("BU username mismatch");
    	}
    	if (!this.BB_username === new_hand.BB_username) {
    		console.log("BB username mismatch");
    	}
    	if (!this.BU_stack === new_hand.BU_stack) {
    		console.log("BU stack size mismatch");
    	}
    	if (!this.BB_stack === new_hand.BB_stack) {
    		console.log("BB stack size mismatch");
    	}
    	if (!this.pot === new_hand.pot) {
    		console.log("pot size mismatch");
    	}
    }

    this.perform_action = function(action) {
    	action_history.push(action);

    	// some logic for the different actions
    }


}

module.exports = HandModel;
