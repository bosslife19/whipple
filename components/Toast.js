import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

const Toast = ({ type = "info", title, message, position = "bottom", visible, onHide, duration = 3000 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShow(false);
      onHide && onHide();
    });
  };

  if (!show) return null;

  const typeStyles = {
    success: { backgroundColor: "#28a745", color: "#fff" },
    error: { backgroundColor: "#dc3545", color: "#fff" },
    info: { backgroundColor: "#17a2b8", color: "#fff" },
    warning: { backgroundColor: "#ffc107", color: "#000" },
  }[type] || typeStyles.info;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { opacity: fadeAnim },
        position === "top" ? { top: 50 } : { bottom: 50 },
        { backgroundColor: typeStyles.backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: typeStyles.color }]}>{title}</Text>
      <Text style={[styles.message, { color: typeStyles.color }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default Toast;
