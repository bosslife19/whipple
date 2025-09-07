import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";

/**
 * 4-Digit OTP Screen (React Native / TypeScript)
 * - Four separate inputs with smart focus management
 * - Handles paste (e.g., "1234") into any box
 * - Auto-submits when all 4 digits are entered
 * - Works with iOS/Android SMS one-time-code autofill where supported
 * - Exposes callbacks for submit, resend, and change
 */

export type OTPProps = {
  length?: number; // default 4
  onSubmit?: (code: string) => void;
  onChange?: (code: string) => void;
  onResend?: () => void;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  resendLabel?: string;
};

const DIGIT_REGEX = /\d/;

export default function OTPScreen({
  length = 4,
  loading,
  onSubmit,
  onChange,
  onResend,
  title = "Enter verification code",
  subtitle = "We sent a 4‑digit code to your email",
  submitLabel = "Verify",
  resendLabel = "Resend code",
}: OTPProps) {
  const [values, setValues] = useState<string[]>(
    Array.from({ length }, () => "")
  );
  const inputs = useRef<Array<TextInput | null>>([]);

  const code = useMemo(() => values.join(""), [values]);
  const isComplete = code.length === length && values.every((v) => v !== "");

  // useEffect(() => {
  //   onChange?.(code);
  //   if (isComplete) {
  //     // small delay lets the last digit render before submit
  //     const t = setTimeout(() => onSubmit?.(code), 100);
  //     return () => clearTimeout(t);
  //   }
  // }, [code, isComplete, onChange, onSubmit]);

  const focusIndex = (i: number) => {
    inputs.current[i]?.focus();
  };

  const handleChange = (text: string, index: number) => {
    // Filter only digits
    const digits = text.split("").filter((c) => DIGIT_REGEX.test(c));
    if (digits.length === 0) {
      // Clearing current box
      setValues((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }

    setValues((prev) => {
      const next = [...prev];
      // If user pasted multiple chars, distribute across boxes
      for (let k = 0; k < digits.length && index + k < length; k++) {
        next[index + k] = digits[k];
      }
      return next;
    });

    // Move focus
    const nextIndex = Math.min(index + digits.length, length - 1);
    if (index < length - 1) focusIndex(nextIndex);
    if (index === length - 1) Keyboard.dismiss();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (values[index]) {
        // Clear current box only
        setValues((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
        return;
      }
      // Move back if empty
      if (index > 0) {
        focusIndex(index - 1);
        setValues((prev) => {
          const next = [...prev];
          next[index - 1] = "";
          return next;
        });
      }
    }
  };

  const handleSubmitPress = () => {
    if (isComplete) onSubmit?.(code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      <View style={styles.row}>
        {values.map((val, i) => (
          <View key={i} style={[styles.box, val ? styles.boxFilled : null]}>
            <TextInput
              ref={(r) => {
                inputs.current[i] = r;
              }}
              style={styles.input}
              value={val}
              onChangeText={(t) => handleChange(t, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType={
                Platform.select({
                  ios: "number-pad",
                  android: "numeric",
                }) as any
              }
              returnKeyType={i === length - 1 ? "done" : "next"}
              maxLength={1}
              textContentType="oneTimeCode" // iOS OTP auto-fill
              autoComplete={
                Platform.OS === "android" ? "one-time-code" : ("sms-otp" as any)
              }
              importantForAutofill="yes"
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#999"
              placeholder="•"
              placeholderTextColor="#AAA"
            />
          </View>
        ))}
      </View>

      <Pressable
        onPress={handleSubmitPress}
        disabled={!isComplete}
        style={({ pressed }) => [
          styles.button,
          !isComplete && styles.buttonDisabled,
          pressed && isComplete ? styles.buttonPressed : null,
        ]}
      >
        {loading ? (
          <ActivityIndicator size={20} color="white" />
        ) : (
          <Text style={styles.buttonText}>{submitLabel}</Text>
        )}
      </Pressable>

      {onResend && (
        <Pressable onPress={onResend} style={styles.resend}>
          <Text style={styles.resendText}>{resendLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const BOX_SIZE = 64;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(238, 246, 255,1)",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 14,
    backgroundColor: "#151518",
    borderWidth: 1,
    borderColor: "#24242a",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  boxFilled: {
    borderColor: "#4f46e5",
  },
  input: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    padding: 0,
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
    minWidth: 180,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  resend: {
    marginTop: 16,
  },
  resendText: {
    color: "#9aa0ff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

/**
 * Usage example (inside a screen):
 *
 * <OTPScreen
 *   onSubmit={(code) => verify(code)}
 *   onResend={() => sendNewCode()}
 * />
 *
 * // If you need validation feedback, call setValues via onChange
 */
