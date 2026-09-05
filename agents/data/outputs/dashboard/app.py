import streamlit as st
import pandas as pd

import os

st.set_page_config(layout="wide")

st.title("🏢 Smart Facility Management AI")

uploaded_file = st.file_uploader("Upload Facility CSV", type="csv")

if uploaded_file:
    df = pd.read_csv(uploaded_file)
else:
    default_csv = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "facility_predictions.csv")
    if not os.path.exists(default_csv):
        default_csv = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "outputs", "facility_predictions.csv")
    df = pd.read_csv(default_csv)


st.subheader("📊 Facility Data")
st.dataframe(df, use_container_width=True)

severity = st.selectbox("Filter by Severity", ["All", "Low", "Medium", "Critical"])
if severity != "All":
    df = df[df["severity"] == severity]

st.subheader("🚨 Filtered Results")
st.dataframe(df, use_container_width=True)

st.subheader("🧠 AI Explanation")
st.write(df["explanation"].tolist())
