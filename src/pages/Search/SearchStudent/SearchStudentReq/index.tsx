import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../../styles/globalStyles';

import Card from '../../../../components/Card';
import { specificStyles } from '../../styles';
import { useAuth } from '../../../../context/AuthProvider/useAuth';

export default function SearchStudentReq() {
	const navigation = useNavigation();
	const auth = useAuth();

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Liberações</Text>
					{auth.estudante?.length == 1 && (
						<>
							{auth.estudante[0].registros.map((registro) => (
								<>
									<Text>{registro.descricao}</Text>
									<Text>{registro.dia_hora_saida}</Text>
									<Text>{registro.dia_liberacao}</Text>
								</>
							))}
						</>
					)}
					<TouchableOpacity
						style={[styles.cardButton, { backgroundColor: '#FF3000' }]}
						onPress={() => {}}
					>
						<Text style={{ textAlign: 'center', color: '#FAFAFA' }}>
							Criar registro
						</Text>
					</TouchableOpacity>
				</View>
			</Card>
			<TouchableOpacity
				style={[styles.cardButton, specificStyles.cardButton]}
				onPress={handleBack}
			>
				<Text style={{ textAlign: 'center', color: '#FAFAFA' }}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
}