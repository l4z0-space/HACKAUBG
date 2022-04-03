from tkinter import W
import numpy as np
import random
from plotly import graph_objs as go
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import plotly.express as px
from pandas import DataFrame
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA


def sankey(categories, spendings):

	source = np.zeros(len(categories)-1)
	target = np.arange(1,len(categories))
	value=np.insert(spendings, 0, np.sum(spendings), axis=0)
	labels = np.insert(categories,0,"Total expenses",axis=0)

	color_node = sns.color_palette("hls", len(categories)).as_hex()
	color_link = sns.color_palette("Spectral", len(categories)).as_hex()

	link = dict(source = source,
			target = target,
			value = value,
			color = color_node)
	node = dict(label=categories, pad=15, thickness=5, color=color_node)
	data = go.Sankey(link=link, node=node)
	#plot
	fig = go.Figure(data)
	fig.write_html("sankey.html")

def twelve_month_spendings(df):
	fig = px.line(df,y='EXPENDITURE',x="MONTH", markers=True, title="EXPENSES THRU LAST YEAR")
	fig.write_html("12_month_spendings.html")

def k_means(ar):
	pca = PCA(n_components=2)
	components = pca.fit_transform(ar)

	kmeans = KMeans(n_clusters=3).fit(components)
	centroids = kmeans.cluster_centers_
	print(centroids)

	plt.scatter(components[:,0], components[:,0], c= kmeans.labels_.astype(float), s=50, alpha=0.5)
	plt.scatter(centroids[:, 0], centroids[:, 1], c='red', s=50)
	plt.savefig("kmeans.png")