import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type ComboSelectProps = {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
};

export default function ComboSelect({
  label,
  selectedValue,
  onValueChange,
  options
}: ComboSelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel = options.find(o => o.value === selectedValue)?.label || 'Selecione...';

  return (
    <><view style={styles.fundoComboPersonalizado}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.comboPersonalizado}
      >
        <Text style={styles.comboTexto}>{selectedLabel}</Text>
        <Feather name="chevron-down" size={20} color="#007BFF" />
      </TouchableOpacity>
        </view>
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemTexto}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 4
  },
  comboPersonalizado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  comboTexto: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
    maxHeight: '50%',
    paddingVertical: 12,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalItemTexto: {
    fontSize: 16,
  },
  fundoComboPersonalizado: {
    backgroundColor: '#DCDCDC'
  }
});