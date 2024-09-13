let nextId = 0;

export const createReminder = (text , completed = false) => {
	return {

		id: nextId++,
		text,
		completed
	
		}
}

export const ogReminders = [];



