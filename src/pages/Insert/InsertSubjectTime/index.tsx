import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';
import Api from '../../../api';

import { IDisciplina } from '../../../context/AuthProvider/types';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';

export default function InsertSubjectTime() {
	const navigation = useNavigation();

	const [idDisciplina, setIdDisciplina] = useState('');
	const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([]);

	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState('');
	const [periodo, setPeriodo] = useState('');
	const [diaSemana, setDiaSemana] = useState('');
	const [tempoInicio, setTempoInicio] = useState('');
	const [tempoFim, setTempoFim] = useState('');

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const { data } = await Api.get('disciplina/listar');
		setLoading(false);
		setDisciplinas(data);
	};

	const handleSubmit = async () => {
		if (idDisciplina == '') return setMessage('Clique em uma disciplina.');
		if (periodo == '') return setMessage('Insira o período do horário.');
		if (diaSemana == '')
			return setMessage('Insira o dia da semana do horário.');
		if (tempoInicio == '')
			return setMessage('Insira o tempo que inicia a aula.');
		if (tempoFim == '') return setMessage('Insira o tempo que termina a aula');
		await Api.post('horario/salvar/?id=' + idDisciplina, {
			periodo: periodo.trim(),
			dia_semana: diaSemana.trim(),
			tempo_inicio: tempoInicio.trim(),
			tempo_fim: tempoFim.trim(),
		});
		setIdDisciplina('');
		setPeriodo('');
		setDiaSemana('');
		setTempoInicio('');
		setTempoFim('');
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			{message !== '' && (
				<Message message={message} handleClose={() => setMessage('')} />
			)}
			<Card position={'center'}>
				<View
					style={[
						styles.cardContainer,
						specificStyles.cardContainer,
						{ justifyContent: 'center' },
					]}
				>
					<Text style={[styles.cardText]}>Horário à Disciplina</Text>
					{loading ? (
						<ActivityIndicator />
					) : (
						<>
							<FlatList
								style={{ height: 100, width: '90%' }}
								data={disciplinas}
								ItemSeparatorComponent={Separator}
								renderItem={({ item }) => (
									<TouchableOpacity
										style={[
											styles.listButton,
											{
												backgroundColor:
													item.id == idDisciplina ? '#2FF31F' : '#2FA34F',
											},
										]}
										onPress={() => setIdDisciplina(item.id)}
									>
										<Text>Disciplina: {item.nome}</Text>
										<Text>{item.semestre} semestre</Text>
										<Text>Turma : {item.turma}</Text>
									</TouchableOpacity>
								)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='PERIODO'
								placeholderTextColor={'#EEE'}
								value={periodo}
								onChangeText={(value) => setPeriodo(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='DIA DA SEMANA'
								placeholderTextColor={'#EEE'}
								value={diaSemana}
								onChangeText={(value) => setDiaSemana(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='TEMPO INÍCIO'
								placeholderTextColor={'#EEE'}
								value={tempoInicio}
								onChangeText={(value) => setTempoInicio(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='TEMPO FIM'
								placeholderTextColor={'#EEE'}
								value={tempoFim}
								onChangeText={(value) => setTempoFim(value)}
							/>
							<Separator />
							<TouchableOpacity
								style={[styles.cardButton]}
								onPress={handleSubmit}
							>
								<Text style={styles.cardButtonText}>Enviar</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
			</Card>
			<TouchableOpacity
				style={[styles.cardButton, { marginTop: 15 }]}
				onPress={() => navigation.goBack()}
			>
				<Text style={styles.cardButtonText}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
}
