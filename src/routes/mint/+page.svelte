<script>
	import { titleStore } from '../../stores/index.js';
	import {
		Button,
		Column,
		DatePicker, DatePickerInput,
		FileUploaderDropContainer,
		Form,
		FormGroup, FormLabel,
		Row,
		TextInput
	} from 'carbon-components-svelte';

	let album = {
		title: '',
		artist: '',
		year: ''
	}

	/**
	 * @param ev {SubmitEvent}
	 */
	const submit = ev => {
		ev.preventDefault();
	};
	$titleStore = 'Mint';

</script>
<Form on:submit={submit}>
	<FormGroup message={true}>
		<Row>
			<Column>
				<TextInput required={true} labelText='Title' bind:value={album.title}/>
				<TextInput required={true} labelText='Artist' bind:value={album.artist}/>
				<DatePicker>
					<DatePickerInput labelText='Year' dateFormat='Y' bind:value={album.year}/>
				</DatePicker>
			</Column>
			<Column>
				<FormLabel>Art</FormLabel>
				<FileUploaderDropContainer required={true} labelText='Front cover'></FileUploaderDropContainer>
			</Column>
		</Row>
	</FormGroup>
	<Button type='submit'>Mint</Button>
</Form>
