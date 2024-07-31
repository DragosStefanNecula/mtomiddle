import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.moveToMiddle', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// Get the visible ranges (excluding folded space)
			const visibleRanges = editor.visibleRanges;
			let rangeLineCount = 0;

			const rangeMap = new Map();

			let rangeLength = 0;
			if (visibleRanges.length > 0) {
				for (let range of visibleRanges) {
					rangeLength = range.end.line - range.start.line + 1;

					rangeMap.set(range.start.line, rangeLength);

					rangeLineCount += rangeLength;
				}
			}

			let middle = Math.round(rangeLineCount / 2);

			console.log("Middle is: " + middle);
			let cursorPos = 0;

			for (const [key, value] of rangeMap) {
				console.log("For tab starting at " + key + "the number of lines is " + value);
				if (middle > value) {
					console.log(middle + "is larger than" + value);
					middle = middle - value;
					console.log("therefore new middle is " + middle);
				} else {
					cursorPos = key + middle - 1;
					break;
				}
			}

			let middlePosition = new vscode.Position(cursorPos, 0);
			console.log(middlePosition);
			editor.selection = new vscode.Selection(middlePosition, middlePosition);
			editor.revealRange(new vscode.Range(middlePosition, middlePosition));
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
