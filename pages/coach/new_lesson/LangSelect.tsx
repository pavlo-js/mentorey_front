import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { LanguageData } from '~/shared/data';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export default function LangSelect() {
	const [languages, setLanguages] = React.useState<string[]>([]);
	const LangSelectBox = React.useRef<HTMLSelectElement>(null);

	const handleChange = (event: SelectChangeEvent<typeof languages>) => {
		const {
			target: { value },
		} = event;
		setLanguages(typeof value === 'string' ? value.split(',') : value);
	};

	const deSelect = (value: any) => {
		setLanguages(languages.filter((item) => item !== value));
		if (LangSelectBox.current) LangSelectBox.current.blur();
	};

	const stopPropagation = (event: any) => {
		event.stopPropagation();
	};

	return (
		<div>
			<FormControl size="small" className="w-full">
				<InputLabel id="langSelectLabel">Languages</InputLabel>
				<Select
					labelId="langSelectLabel"
					multiple
					ref={LangSelectBox}
					id="langSelect"
					value={languages}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label="Languages" />}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{selected.map((value) => (
								<Chip
									key={value}
									label={value}
									variant="outlined"
									onDelete={() => deSelect(value)}
									size="small"
									deleteIcon={
										<IconButton onMouseDown={stopPropagation} size="small">
											<CancelIcon className="text-lg" />
										</IconButton>
									}
								/>
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{LanguageData.items.map((option) => (
						<MenuItem key={option.key} value={option.label}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
