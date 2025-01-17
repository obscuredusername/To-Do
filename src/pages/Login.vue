<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card rounded="xl" :style="{ width: togswitch ? '50%' : '75%' }" class="ma-4 pa-4">
      <v-card-title>
        <h3 class="font-weight-bold text-h3 text-grey-lighten-1">
          {{ heading }}
        </h3>
      </v-card-title>
      <v-card-text>{{ subHeading }} </v-card-text>
      <v-divider thickness="3" />
      <v-form ref="form" v-model="valid">
        <v-card-text v-if="!togswitch">Upload Picture</v-card-text>
        <v-file-input
              v-if="!togswitch"
              v-model="photo"
              :rules="[photoRules.required]"
              density="compact"
              placeholder="Upload a Profile Photo"
              variant="outlined"
              accept="image/*"
              hide-input
              show-size
              class="dotted-border ma-5 pa-10"
            />
        <v-row>
            
          <v-col :cols="togswitch? 12 : 6">
            <v-card-text>Email</v-card-text>
            <v-text-field
              v-model="email"
              :rules="[emailRules.required, emailRules.email]"
              density="compact"
              placeholder="Enter your Email"
              variant="outlined"
            />

            <v-card-text>Password</v-card-text>
            <v-text-field
              v-model="password"
              :rules="[passwordRules.required, passwordRules.minLength]"
              density="compact"
              placeholder="Enter your Password"
              type="password"
              variant="outlined"
            />

            <v-card-text v-if="!togswitch">Confirm Password</v-card-text>
            <v-text-field
              v-if="!togswitch"
              v-model="confirmPassword"
              :rules="[confirmPasswordRules.required, confirmPasswordRules.match]"
              density="compact"
              placeholder="Confirm your Password"
              type="password"
              variant="outlined"
            />
          </v-col>

          <!-- Right Column: Phone, Age, Gender, Profile Photo -->
          <v-col cols="6" v-if="!togswitch">
            <!-- Phone Number Field -->
            <v-card-text v-if="!togswitch">Phone Number</v-card-text>
            <v-text-field
              v-if="!togswitch"
              v-model="phone"
              :rules="[phoneRules.required, phoneRules.valid]"
              density="compact"
              placeholder="Enter your Phone Number"
              variant="outlined"
            />

            <!-- Age Field -->
            <v-card-text v-if="!togswitch">Age</v-card-text>
            <v-text-field
              v-if="!togswitch" 
              v-model="age"
              :rules="[ageRules.required, ageRules.valid]"
              density="compact"
              placeholder="Enter your Age"
              variant="outlined"
              type="number"
            />

            <!-- Gender Field -->
            <v-card-text v-if="!togswitch">Gender</v-card-text>
            <v-select
              v-if="!togswitch"
              v-model="gender"
              :items="genderOptions"
              :rules="[genderRules.required]"
              density="compact"
              placeholder="Select your Gender"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-card-action class="d-flex justify-center">
          <v-btn @click="handleSubmit" :disabled="!valid" rounded class="p-4 w-50 actionBtn">
            {{ btnName }}
          </v-btn>
        </v-card-action>

        <!-- Switch to Login/Signup -->
        <v-card-subtitle @click="toggle" style="cursor: pointer" class="d-flex justify-center pa-4">
          {{ switchStatement }}
        </v-card-subtitle>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      heading: "Lets Login",
      subHeading: "Please enter your login details to continue.",
      btnName: "Login",
      switchStatement: `Don't have an Account? Sign up`,
      togswitch: true,
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      age: "",
      gender: null,
      photo: null,
      valid: false,
      
      // Validation Rules
      emailRules: {
        required: value => !!value || 'Email is required',
        email: value => /.+@.+\..+/.test(value) || 'Please enter a valid email',
      },
      passwordRules: {
        required: value => !!value || 'Password is required',
        minLength: value => (value && value.length >= 6) || 'Password must be at least 6 characters long',
      },
      confirmPasswordRules: {
        required: value => !!value || 'Confirm Password is required',
        match: value => value === this.password || 'Passwords do not match',
      },
      phoneRules: {
        required: value => !!value || 'Phone number is required',
        valid: value => /^[0-9]{10}$/.test(value) || 'Please enter a valid 10-digit phone number',
      },
      ageRules: {
        required: value => !!value || 'Age is required',
        valid: value => (value >= 18 && value <= 100) || 'Age must be between 18 and 100',
      },
      genderRules: {
        required: value => !!value || 'Gender is required',
      },
      photoRules: {
        required: value => !!value || 'Profile photo is required',
      },
      genderOptions: ['Male', 'Female', 'Other'],
    };
  },
  methods: {
    toggle() {
      if (this.togswitch) {
        this.togswitch = !this.togswitch;
        this.heading = "Let's Sign you up";
        this.subHeading = "Please Enter the details";
        this.btnName = "Sign Up";
        this.switchStatement = `Already have an Account? Login`;
      } else {
        this.togswitch = !this.togswitch;
        this.heading = "Let's Login";
        this.subHeading = "Please enter your login details to continue.";
        this.btnName = "Login";
        this.switchStatement = `Don't have an Account? Sign up`;
      }
    },
    handleSubmit() {
      // Handle form submission logic (e.g., route to another page or submit data)
      this.$router.push('/home');
    },
  },
};
</script>

<style>
.actionBtn {
  background-color: #047185 !important;
}
.actionBtn:hover {
  background-color: #07bedf !important;
}

/* Dotted Border for Profile Picture */
.dotted-border {
  border: 2px dotted #047185;
  padding: 10px;
}
</style>
