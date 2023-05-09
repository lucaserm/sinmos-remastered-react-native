import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../../styles/globalStyles';

import Card from '../../../../components/Card';
import { specificStyles } from '../../styles';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import { propsStack } from '../../../mainStackParams';
import Separator from '../../../../components/Separator';

export default function SearchStudentReq() {
	const navigation = useNavigation<propsStack>();
	const auth = useAuth();

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Liberações</Text>
					{auth.estudante[0].registros.length == 0 ? (
						<View>
							<Text>Nenhum registro encontrado.</Text>
						</View>
					) : (
						<FlatList
							style={styles.list}
							data={auth.estudante[0].registros.reverse()}
							ItemSeparatorComponent={Separator}
							renderItem={({ item }) => (
								<TouchableOpacity style={styles.listButton}>
									<Text>{item.descricao}</Text>
									<Text>{item.dia_liberacao}</Text>
								</TouchableOpacity>
							)}
						/>
					)}
					<TouchableOpacity
						style={[styles.cardButton, { backgroundColor: '#FF3000' }]}
						onPress={() => navigation.navigate('InsertStudentRegistro')}
					>
						<Text style={styles.cardButtonText}>Criar registro</Text>
					</TouchableOpacity>
				</View>
			</Card>
			<TouchableOpacity
				style={[styles.cardButton, specificStyles.cardButton]}
				onPress={handleBack}
			>
				<Text style={styles.cardButtonText}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
}
