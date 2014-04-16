window.chordDiagram = function ( frets, fingers )
{
	var validateArray = function ( array, max_value )
	{
		if ('object' != typeof array) return false;

		for (var i = 0; i < 6; ++i) if ('number' != typeof array[i] || array[i] % 1 !== 0 || array[i] < -1 || array[i] > max_value) return false;

		return true;
	};

	if (!validateArray(frets, 32)) throw "Frets parameter format is invalid";
	if (!validateArray(fingers, 4)) throw "Fingers parameter format is invalid";

	var header_row_needed = false;
	var footer_row_needed = false;
	var fret_min = 100;
	var fret_max = 0;

	for (var i = 0; i < 6; ++i)
	{
		if (frets[i] == 0 || frets[i] == -1) header_row_needed = true;
		if (frets[i] > -1 && frets[i] > fret_max) fret_max = frets[i];
		if (frets[i] > 0 && frets[i] < fret_min) fret_min = frets[i];
		if ('object' == typeof fingers && fingers[i] != -1) footer_row_needed = true;
	}

	var container = document.createElement('div');
	container.className = 'chord-diagram';

	if (header_row_needed)
	{
		var header_row = document.createElement('div');
		header_row.className = 'header';

		for (i in frets)
		{
			var header_cell = document.createElement('div');

			if (frets[i] == 0) header_cell.innerHTML = '<div></div>';
			else if (frets[i] == -1) header_cell.innerHTML = '&times;';

			header_row.appendChild(header_cell);
		}

		container.appendChild(header_row);
	}

	var first_fret = fret_max > 5 ? fret_min : 1;

	for (var fret = first_fret; fret < first_fret + 5; ++fret)
	{
		var frets_row = document.createElement('div');

		if (fret == 1) frets_row.className = 'row first';
		else if (fret == first_fret + 4) frets_row.className = 'row last';
		else frets_row.className = 'row';

		var barre_start = -1,
			barre_finish = -1,
			barre_finger = -1;

		if (footer_row_needed)
		{
			for (i = 0; i < 6; ++i)
			{
				if (barre_start != -1)
				{
					if (frets[i] == fret && fingers[i] == barre_finger)
					{
						barre_finish = i;
					}
					else if (frets[i] < fret || (frets[i] == fret && fingers[i] != barre_finger))
					{
						if (barre_finish != -1) break; // exiting
						else barre_start = -1; // resetting
					}
				}

				if (barre_start == -1 && fingers[i] != -1 && frets[i] == fret)
				{
					barre_start = i;
					barre_finger = fingers[i];
				}
			}

			if (barre_finish <= barre_start) barre_start = -1;
		}

		for (i = 0; i < 5; ++i)
		{
			var fret_cell = document.createElement('div');

			if (i == barre_start)
			{
				var barre_cell = document.createElement('div');
				barre_cell.className = 'barre barre-' + (barre_finish - barre_start);

				fret_cell.appendChild(barre_cell);
			}
			else if (i < barre_start || i >= barre_finish)
			{
				if (i != barre_finish && frets[i] == fret)
				{
					var knob_cell = document.createElement('div');
					knob_cell.className = 'knob';

					fret_cell.appendChild(knob_cell);
				}

				if (i == 4 && frets[5] == fret)
				{
					var knob_cell = document.createElement('div');
					knob_cell.className = 'knob right';

					fret_cell.appendChild(knob_cell);
				}
			}

			frets_row.appendChild(fret_cell);
		}

		if (fret == first_fret && fret != 1)
		{
			var fretno_cell = document.createElement('div');
			fretno_cell.className = 'fretno';
			fretno_cell.innerText = fret;

			frets_row.appendChild(fretno_cell);
		}

		container.appendChild(frets_row);
	}

	if (footer_row_needed)
	{
		var footer_row = document.createElement('div');
		footer_row.className = 'footer';

		for (i = 0; i < 6; ++i)
		{
			var finger_cell = document.createElement('div');

			if (frets[i] > 0)
			{
				if (fingers[i] == 0) finger_cell.innerText = 'T';
				else if (fingers[i] > 0) finger_cell.innerText = fingers[i];
			}

			footer_row.appendChild(finger_cell);
		}

		container.appendChild(footer_row);
	}

	if ('undefined' != typeof fretno_cell)
	{
		//alert(window.getComputedStyle(container).width);
	}
	console.log(window.getComputedStyle(container).getPropertyValue("width"));

	return container;
}