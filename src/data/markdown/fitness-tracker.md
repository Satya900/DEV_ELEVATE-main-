# Mobile Fitness Tracker

A comprehensive cross-platform mobile application for tracking workouts, nutrition, and fitness goals with social features and real-time synchronization.

## Overview

This fitness tracking app combines workout logging, nutrition tracking, goal setting, and social features to create a complete fitness ecosystem. Built with React Native for cross-platform compatibility and Node.js backend for real-time data synchronization.

## Key Features

### Workout Tracking
- **Exercise Library**: Comprehensive database of exercises with instructions and videos
- **Custom Workouts**: Create and save personalized workout routines
- **Progress Tracking**: Track weights, reps, sets, and personal records
- **Timer Integration**: Built-in rest timers and workout duration tracking
- **Offline Mode**: Continue tracking workouts without internet connection

### Nutrition Management
- **Food Database**: Extensive nutrition database with barcode scanning
- **Meal Planning**: Plan meals and track macronutrients
- **Calorie Tracking**: Monitor daily caloric intake and expenditure
- **Water Intake**: Track daily hydration goals
- **Photo Logging**: Visual meal logging with photo capture

### Social Features
- **Friend System**: Connect with friends and workout partners
- **Activity Feed**: Share workouts and achievements
- **Challenges**: Participate in fitness challenges and competitions
- **Leaderboards**: Compare progress with friends and community
- **Workout Sharing**: Share custom workouts with the community

## Technology Stack

### Mobile App Architecture
```javascript
// React Native with TypeScript
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import WorkoutScreen from './src/screens/WorkoutScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SocialScreen from './src/screens/SocialScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#FF6B6B',
              tabBarInactiveTintColor: '#8E8E93',
              headerShown: false,
            }}
          >
            <Tab.Screen 
              name="Workout" 
              component={WorkoutScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="dumbbell" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen 
              name="Nutrition" 
              component={NutritionScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="apple" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen 
              name="Progress" 
              component={ProgressScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="trending-up" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen 
              name="Social" 
              component={SocialScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="users" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="user" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
```

### Workout Tracking Component
```typescript
// components/WorkoutTracker.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Exercise, WorkoutSet, Workout } from '../types';
import { addWorkout, updateCurrentWorkout } from '../store/workoutSlice';
import Timer from './Timer';
import ExerciseCard from './ExerciseCard';

interface WorkoutTrackerProps {
  workout: Workout;
  onComplete: () => void;
}

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ workout, onComplete }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSets, setCurrentSets] = useState<WorkoutSet[]>([]);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [workoutStartTime] = useState(new Date());

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const currentExercise = workout.exercises[currentExerciseIndex];

  const addSet = (weight: number, reps: number) => {
    const newSet: WorkoutSet = {
      id: Date.now().toString(),
      exerciseId: currentExercise.id,
      weight,
      reps,
      completed: true,
      timestamp: new Date(),
    };

    setCurrentSets([...currentSets, newSet]);
    
    // Start rest timer
    setIsResting(true);
    setRestTime(currentExercise.restTime || 60);
  };

  const nextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSets([]);
    } else {
      completeWorkout();
    }
  };

  const completeWorkout = () => {
    const completedWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
      userId: user.id,
      startTime: workoutStartTime,
      endTime: new Date(),
      sets: currentSets,
      completed: true,
    };

    dispatch(addWorkout(completedWorkout));
    onComplete();
  };

  const renderExerciseSet = ({ item, index }: { item: WorkoutSet; index: number }) => (
    <View style={styles.setRow}>
      <Text style={styles.setNumber}>{index + 1}</Text>
      <Text style={styles.setWeight}>{item.weight} kg</Text>
      <Text style={styles.setReps}>{item.reps} reps</Text>
      <TouchableOpacity style={styles.checkButton}>
        <Icon name="check" size={16} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.workoutTitle}>{workout.name}</Text>
        <Text style={styles.exerciseCounter}>
          {currentExerciseIndex + 1} / {workout.exercises.length}
        </Text>
      </View>

      <ExerciseCard exercise={currentExercise} />

      <View style={styles.setsContainer}>
        <View style={styles.setsHeader}>
          <Text style={styles.setsTitle}>Sets</Text>
          <View style={styles.setsLabels}>
            <Text style={styles.label}>Set</Text>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.label}>Reps</Text>
            <Text style={styles.label}>✓</Text>
          </View>
        </View>

        <FlatList
          data={currentSets}
          renderItem={renderExerciseSet}
          keyExtractor={(item) => item.id}
          style={styles.setsList}
        />

        <AddSetForm onAddSet={addSet} />
      </View>

      {isResting && (
        <Timer
          duration={restTime}
          onComplete={() => setIsResting(false)}
          title="Rest Time"
        />
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={nextExercise}
          disabled={currentSets.length === 0}
        >
          <Text style={styles.nextButtonText}>
            {currentExerciseIndex === workout.exercises.length - 1 ? 'Finish' : 'Next Exercise'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  exerciseCounter: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  setsContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  setsHeader: {
    marginBottom: 16,
  },
  setsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  setsLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  setNumber: {
    fontSize: 16,
    fontWeight: '500',
    width: 30,
  },
  setWeight: {
    fontSize: 16,
    width: 80,
    textAlign: 'center',
  },
  setReps: {
    fontSize: 16,
    width: 60,
    textAlign: 'center',
  },
  checkButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    paddingTop: 16,
  },
  nextButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WorkoutTracker;
```

### Backend API Architecture
```javascript
// server/models/Workout.js
const mongoose = require('mongoose');

const exerciseSetSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  weight: { type: Number, required: true },
  reps: { type: Number, required: true },
  duration: { type: Number }, // For time-based exercises
  distance: { type: Number }, // For cardio exercises
  restTime: { type: Number },
  notes: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  exercises: [{
    exerciseId: { type: String, required: true },
    name: { type: String, required: true },
    targetSets: { type: Number },
    targetReps: { type: Number },
    targetWeight: { type: Number },
    restTime: { type: Number, default: 60 }
  }],
  sets: [exerciseSetSchema],
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  duration: { type: Number }, // in minutes
  totalVolume: { type: Number }, // total weight lifted
  caloriesBurned: { type: Number },
  notes: { type: String },
  isTemplate: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: false },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Calculate workout metrics
workoutSchema.methods.calculateMetrics = function() {
  const sets = this.sets;
  
  this.totalVolume = sets.reduce((total, set) => {
    return total + (set.weight * set.reps);
  }, 0);
  
  if (this.startTime && this.endTime) {
    this.duration = Math.round((this.endTime - this.startTime) / (1000 * 60));
  }
  
  // Estimate calories burned (simplified calculation)
  this.caloriesBurned = Math.round(this.duration * 8); // ~8 calories per minute
};

workoutSchema.pre('save', function(next) {
  this.calculateMetrics();
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Workout', workoutSchema);
```

### Real-time Synchronization
```javascript
// server/socket/workoutSocket.js
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class WorkoutSocketManager {
  constructor(server) {
    this.io = socketIo(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    
    this.setupMiddleware();
    this.setupEventHandlers();
  }

  setupMiddleware() {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
          return next(new Error('Authentication error'));
        }
        
        socket.userId = user._id.toString();
        socket.user = user;
        next();
      } catch (err) {
        next(new Error('Authentication error'));
      }
    });
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User ${socket.user.username} connected`);
      
      // Join user's personal room
      socket.join(`user_${socket.userId}`);
      
      // Join friends' workout rooms
      this.joinFriendsRooms(socket);

      socket.on('start_workout', (workoutData) => {
        this.handleStartWorkout(socket, workoutData);
      });

      socket.on('update_workout', (updateData) => {
        this.handleUpdateWorkout(socket, updateData);
      });

      socket.on('complete_workout', (workoutData) => {
        this.handleCompleteWorkout(socket, workoutData);
      });

      socket.on('join_workout_session', (sessionId) => {
        socket.join(`workout_${sessionId}`);
      });

      socket.on('disconnect', () => {
        console.log(`User ${socket.user.username} disconnected`);
      });
    });
  }

  async joinFriendsRooms(socket) {
    try {
      const user = await User.findById(socket.userId).populate('friends');
      user.friends.forEach(friend => {
        socket.join(`friend_${friend._id}`);
      });
    } catch (error) {
      console.error('Error joining friends rooms:', error);
    }
  }

  handleStartWorkout(socket, workoutData) {
    // Broadcast to friends that user started a workout
    socket.to(`friend_${socket.userId}`).emit('friend_started_workout', {
      userId: socket.userId,
      username: socket.user.username,
      workoutName: workoutData.name,
      timestamp: new Date()
    });

    // Send confirmation to user
    socket.emit('workout_started', {
      success: true,
      workoutId: workoutData.id
    });
  }

  handleUpdateWorkout(socket, updateData) {
    // Real-time workout progress updates
    socket.to(`workout_${updateData.workoutId}`).emit('workout_progress', {
      userId: socket.userId,
      progress: updateData.progress,
      currentExercise: updateData.currentExercise,
      timestamp: new Date()
    });
  }

  handleCompleteWorkout(socket, workoutData) {
    // Broadcast workout completion to friends
    socket.to(`friend_${socket.userId}`).emit('friend_completed_workout', {
      userId: socket.userId,
      username: socket.user.username,
      workout: workoutData,
      timestamp: new Date()
    });

    // Update user's activity feed
    this.updateActivityFeed(socket.userId, workoutData);
  }

  async updateActivityFeed(userId, workoutData) {
    // Add workout to activity feed
    const activity = {
      userId,
      type: 'workout_completed',
      data: workoutData,
      timestamp: new Date()
    };

    // Broadcast to user's friends
    this.io.to(`friend_${userId}`).emit('new_activity', activity);
  }
}

module.exports = WorkoutSocketManager;
```

## Nutrition Tracking

### Food Database Integration
```typescript
// services/nutritionService.ts
import { FoodItem, NutritionData, MealEntry } from '../types/nutrition';

class NutritionService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NUTRITION_API_KEY || '';
    this.baseUrl = 'https://api.edamam.com/api/food-database/v2';
  }

  async searchFood(query: string): Promise<FoodItem[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/parser?app_id=${this.apiKey}&app_key=${this.apiKey}&ingr=${encodeURIComponent(query)}`
      );
      
      const data = await response.json();
      
      return data.hints.map((hint: any) => ({
        id: hint.food.foodId,
        name: hint.food.label,
        brand: hint.food.brand,
        category: hint.food.category,
        image: hint.food.image,
        nutrients: {
          calories: hint.food.nutrients.ENERC_KCAL || 0,
          protein: hint.food.nutrients.PROCNT || 0,
          carbs: hint.food.nutrients.CHOCDF || 0,
          fat: hint.food.nutrients.FAT || 0,
          fiber: hint.food.nutrients.FIBTG || 0,
          sugar: hint.food.nutrients.SUGAR || 0,
          sodium: hint.food.nutrients.NA || 0,
        },
        servingSize: hint.measures[0]?.weight || 100,
        servingUnit: hint.measures[0]?.label || 'g'
      }));
    } catch (error) {
      console.error('Error searching food:', error);
      throw new Error('Failed to search food database');
    }
  }

  async scanBarcode(barcode: string): Promise<FoodItem | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/parser?app_id=${this.apiKey}&app_key=${this.apiKey}&upc=${barcode}`
      );
      
      const data = await response.json();
      
      if (data.hints.length > 0) {
        const hint = data.hints[0];
        return {
          id: hint.food.foodId,
          name: hint.food.label,
          brand: hint.food.brand,
          barcode,
          nutrients: {
            calories: hint.food.nutrients.ENERC_KCAL || 0,
            protein: hint.food.nutrients.PROCNT || 0,
            carbs: hint.food.nutrients.CHOCDF || 0,
            fat: hint.food.nutrients.FAT || 0,
          },
          servingSize: 100,
          servingUnit: 'g'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error scanning barcode:', error);
      return null;
    }
  }

  calculateNutritionTotals(meals: MealEntry[]): NutritionData {
    return meals.reduce((totals, meal) => {
      const mealNutrition = this.calculateMealNutrition(meal);
      return {
        calories: totals.calories + mealNutrition.calories,
        protein: totals.protein + mealNutrition.protein,
        carbs: totals.carbs + mealNutrition.carbs,
        fat: totals.fat + mealNutrition.fat,
        fiber: totals.fiber + mealNutrition.fiber,
        sugar: totals.sugar + mealNutrition.sugar,
        sodium: totals.sodium + mealNutrition.sodium,
      };
    }, {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    });
  }

  private calculateMealNutrition(meal: MealEntry): NutritionData {
    const multiplier = meal.quantity / meal.food.servingSize;
    
    return {
      calories: meal.food.nutrients.calories * multiplier,
      protein: meal.food.nutrients.protein * multiplier,
      carbs: meal.food.nutrients.carbs * multiplier,
      fat: meal.food.nutrients.fat * multiplier,
      fiber: meal.food.nutrients.fiber * multiplier,
      sugar: meal.food.nutrients.sugar * multiplier,
      sodium: meal.food.nutrients.sodium * multiplier,
    };
  }
}

export default new NutritionService();
```

### Barcode Scanner Component
```typescript
// components/BarcodeScanner.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
  ], {
    checkInverted: true,
  });

  useEffect(() => {
    checkCameraPermission();
  }, []);

  useEffect(() => {
    if (barcodes.length > 0 && isScanning) {
      const barcode = barcodes[0];
      setIsScanning(false);
      onScan(barcode.displayValue);
    }
  }, [barcodes, isScanning, onScan]);

  const checkCameraPermission = async () => {
    const permission = await Camera.getCameraPermissionStatus();
    
    if (permission === 'granted') {
      setHasPermission(true);
    } else if (permission === 'not-determined') {
      const newPermission = await Camera.requestCameraPermission();
      setHasPermission(newPermission === 'granted');
    } else {
      Alert.alert(
        'Camera Permission',
        'Camera permission is required to scan barcodes',
        [{ text: 'OK', onPress: onClose }]
      );
    }
  };

  if (!hasPermission || !device) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          {!hasPermission ? 'Camera permission required' : 'Camera not available'}
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      
      <View style={styles.overlay}>
        <View style={styles.scanArea}>
          <View style={styles.corner} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
        
        <Text style={styles.instruction}>
          Position the barcode within the frame
        </Text>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 150,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#FF6B6B',
    borderWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  instruction: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  message: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  closeButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BarcodeScanner;
```

## Progress Tracking and Analytics

### Progress Visualization
```typescript
// components/ProgressCharts.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { ProgressData, WorkoutStats } from '../types';

const screenWidth = Dimensions.get('window').width;

interface ProgressChartsProps {
  progressData: ProgressData;
  workoutStats: WorkoutStats;
}

const ProgressCharts: React.FC<ProgressChartsProps> = ({ 
  progressData, 
  workoutStats 
}) => {
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#FF6B6B',
    },
  };

  const weightProgressData = {
    labels: progressData.weightHistory.map(entry => 
      new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        data: progressData.weightHistory.map(entry => entry.weight),
        color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const workoutFrequencyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: workoutStats.weeklyFrequency,
      },
    ],
  };

  const muscleGroupData = workoutStats.muscleGroupDistribution.map((item, index) => ({
    name: item.muscleGroup,
    population: item.percentage,
    color: `hsl(${index * 45}, 70%, 60%)`,
    legendFontColor: '#2C3E50',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weight Progress</Text>
        <LineChart
          data={weightProgressData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Workout Frequency</Text>
        <BarChart
          data={workoutFrequencyData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Muscle Group Distribution</Text>
        <PieChart
          data={muscleGroupData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Total Workouts"
          value={workoutStats.totalWorkouts.toString()}
          icon="💪"
        />
        <StatCard
          title="Total Volume"
          value={`${workoutStats.totalVolume.toLocaleString()} kg`}
          icon="🏋️"
        />
        <StatCard
          title="Avg Duration"
          value={`${workoutStats.averageDuration} min`}
          icon="⏱️"
        />
        <StatCard
          title="Calories Burned"
          value={workoutStats.totalCalories.toLocaleString()}
          icon="🔥"
        />
      </View>
    </View>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: string;
}> = ({ title, value, icon }) => (
  <View style={styles.statCard}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});

export default ProgressCharts;
```

## Testing

### Unit Tests
```typescript
// __tests__/WorkoutService.test.ts
import WorkoutService from '../services/WorkoutService';
import { Workout, Exercise } from '../types';

describe('WorkoutService', () => {
  const mockWorkout: Workout = {
    id: '1',
    name: 'Push Day',
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench Press',
        targetSets: 3,
        targetReps: 10,
        targetWeight: 80,
      },
    ],
    userId: 'user1',
    startTime: new Date(),
    sets: [],
    completed: false,
  };

  test('should calculate workout volume correctly', () => {
    const sets = [
      { exerciseId: 'bench-press', weight: 80, reps: 10 },
      { exerciseId: 'bench-press', weight: 80, reps: 8 },
      { exerciseId: 'bench-press', weight: 80, reps: 6 },
    ];

    const volume = WorkoutService.calculateVolume(sets);
    expect(volume).toBe(1920); // (80 * 10) + (80 * 8) + (80 * 6)
  });

  test('should estimate calories burned', () => {
    const duration = 60; // minutes
    const calories = WorkoutService.estimateCalories(duration, 'strength');
    expect(calories).toBeGreaterThan(0);
  });
});
```

## Deployment

### React Native Build Configuration
```javascript
// metro.config.js
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
```

### CI/CD Pipeline
```yaml
# .github/workflows/mobile-ci.yml
name: Mobile CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run lint

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '11'
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: cd android && ./gradlew assembleRelease

  build-ios:
    needs: test
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: cd ios && xcodebuild -workspace FitnessTracker.xcworkspace -scheme FitnessTracker archive
```

## Future Enhancements

- **AI Personal Trainer**: Machine learning-powered workout recommendations
- **Wearable Integration**: Apple Watch and Fitbit synchronization
- **Advanced Analytics**: Detailed performance analysis and predictions
- **Meal Planning**: AI-powered meal planning based on fitness goals
- **Virtual Coaching**: Video-based form correction and guidance
- **Community Features**: Group challenges and social workouts

## Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for improvements.

## License

This project is licensed under the MIT License.