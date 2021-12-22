import json
import streamlit as st
from datetime import datetime, timedelta
import matplotlib.pyplot as plt

import pandas as pd

days_arr = list(range(1, 30))
x_days = st.sidebar.selectbox("Load data with interval of x days:", days_arr)

# results = st.sidebar.multiselect(
#     "TYPE", ["Petrol", "Diesel", "CNG"], ["Petrol", "Diesel"])


def get_for_date(d):
    formatted_date = d.strftime("%Y-%m-%d")
    try:
        with open(f"./history/{formatted_date}.json") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


data = []
current_date = datetime.now()
for i in range(30):
    data.extend(get_for_date(current_date - timedelta(days=i * x_days)))


df = pd.DataFrame(data)

# st.write(get_for_date(datetime.now()))
# st.table(df)
fig, ax = plt.subplots()
df.price = df.price.map(int)
df.pivot('date', ['type'], ['price']).plot(ax=ax)

st.pyplot(fig)
