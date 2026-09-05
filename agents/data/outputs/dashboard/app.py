import streamlit as st
import pandas as pd

st.set_page_config(layout="wide")

st.title("🏢 Smart Facility Management AI")

uploaded_file = st.file_uploader("Upload Facility CSV", type="csv")

if uploaded_file:
    df = pd.read_csv(uploaded_file)
else:
    df = pd.read_csv("agents/data/outputs/facility_predictions.csv")

st.subheader("📊 Facility Data")
st.dataframe(df, use_container_width=True)

severity = st.selectbox("Filter by Severity", ["All", "Low", "Medium", "Critical"])
if severity != "All":
    df = df[df["severity"] == severity]

st.subheader("🚨 Filtered Results")
st.dataframe(df, use_container_width=True)

st.subheader("🧠 AI Explanation")
st.write(df["explanation"].tolist())
