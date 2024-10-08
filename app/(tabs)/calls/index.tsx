import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { CurvedTransition, FadeInUp, FadeOutUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import calls from '../../../assets/data/calls.json';
import AppleStyleRanimatedSwipeableRow from '../../../components/AppleStyleRanimatedSwipeableRow';
import { SegmentedControl } from '../../../components/SegmentedControl';
import { Separator } from '../../../components/Separator';
import { colors } from '../../../constants/Colors';
import { defaultStyles } from '../../../styles/Styles';
import { callsStyles } from '../../../styles/callsStyles';

const transition = CurvedTransition.delay(100);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Calls = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const [items, setItems] = useState(calls);
  const [isEditing, setIsEditing] = useState(false);
  const editing = useSharedValue(-30);

  const onSegmentChange = (option: string) => {
    setSelectedOption(option);
    if (option === 'All') {
      setItems(calls);
    } else {
      setItems(calls.filter((call) => call.missed));
    }
  };

  const callsHeaderTitle = () => {
    return (
      <SegmentedControl
        options={['All', 'Missed']}
        selectedOption={selectedOption}
        onOptionPress={onSegmentChange}
      />
    );
  };

  const callsHeaderLeft = () => {
    return (
      <Pressable onPress={onEdit}>
        <Text style={callsStyles.callsHeaderLeft}>
          {isEditing ? 'Done' : 'Edit'}
        </Text>
      </Pressable>
    );
  };

  const removeCall = (toDelete: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems(items.filter((item) => item.id !== toDelete.id));
  };

  const onEdit = () => {
    let editingNew = !isEditing;
    editing.value = editingNew ? 0 : -30;
    setIsEditing(editingNew);
  };

  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  const animatedPosition = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  return (
    <View style={callsStyles.view0}>
      <Stack.Screen options={{ headerTitle: callsHeaderTitle, headerLeft: callsHeaderLeft, }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={defaultStyles.pb40}>
        <Animated.View style={defaultStyles.block} layout={transition}>
          <Animated.FlatList
            skipEnteringExitingAnimations
            data={items}
            scrollEnabled={false}
            itemLayoutAnimation={transition}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={Separator}
            renderItem={({ item, index }) => (
              <AppleStyleRanimatedSwipeableRow onDelete={() => removeCall(item)}>
                <Animated.View entering={FadeInUp.delay(index * 20)} exiting={FadeOutUp} style={callsStyles.AnimatedView}>
                  <AnimatedPressable style={[animatedPosition, defaultStyles.pl8]} onPress={() => removeCall(item)}>
                    <Ionicons name="remove-circle" size={24} color={colors.red} />
                  </AnimatedPressable>
                  <Animated.View style={[defaultStyles.item, defaultStyles.pl20, animatedRowStyles]}>
                    <Image source={{ uri: item.img }} style={callsStyles.avatar} />
                    <View style={callsStyles.view}>
                      <Text style={[defaultStyles.fs18, { color: item.missed ? colors.red : colors.foregroundColor1 }]}>
                        {item.name}
                      </Text>
                      <View style={callsStyles.view1}>
                        <Ionicons name={item.video ? 'videocam' : 'call'} size={16} color={colors.foregroundColor2} />
                        <Text style={callsStyles.text}>
                          {item.incoming ? 'Incoming' : 'Outgoing'}
                        </Text>
                      </View>
                    </View>
                    <View style={callsStyles.view2}>
                      <Text style={callsStyles.text1}>{format(item.date, 'MM.dd.yy')}</Text>
                      <Ionicons name="information-circle-outline" size={24} color={colors.accentColor} />
                    </View>
                  </Animated.View>
                </Animated.View>
              </AppleStyleRanimatedSwipeableRow>
            )}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Calls;
