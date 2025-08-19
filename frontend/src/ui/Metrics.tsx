//Metrics.tsx

import React, { useMemo } from 'react'
import { Box, Grid, Paper, Typography, Chip, Divider, Stack } from '@mui/material'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export function Metrics({ summary }: { summary: any }) {
  const {
    row_count,
    column_count,
    missing_rate,
    imputations_applied,
    outliers_detected,
    quality_score,
    weighting,
  inferred_schema
  } = summary

  const qualityData = {
    labels: ['Quality', 'Gap'],
    datasets: [{
      data: [quality_score, Math.max(0, 100 - quality_score)],
      backgroundColor: ['#1976d2', '#e0e0e0'],
      borderWidth: 0
    }]
  }

  const weights = weighting?.weights ?? {}
  const weightLabels = Object.keys(weights)
  const weightValues = Object.values(weights)

  const weightsData = {
    labels: weightLabels,
    datasets: [{
      label: `Weights (${weighting?.domain ?? 'n/a'})`,
      data: weightValues,
      backgroundColor: '#90caf9'
    }]
  }

  // Build a histogram of numeric weight values (if available)
  const weightNumValues = (weightValues as number[]).filter((v: any) => typeof v === 'number' && isFinite(v))
  let histLabels: string[] = []
  let histValues: number[] = []
  if (weightNumValues.length > 0) {
    const min = Math.min(...weightNumValues)
    const max = Math.max(...weightNumValues)
    const bins = Math.min(7, Math.max(3, Math.ceil(Math.sqrt(weightNumValues.length)))) // heuristic
    const step = (max - min) / (bins || 1) || 1
    const counts = new Array(bins).fill(0)
    weightNumValues.forEach(v => {
      let idx = Math.floor((v - min) / step)
      if (idx >= bins) idx = bins - 1
      if (idx < 0) idx = 0
      counts[idx]++
    })
    histValues = counts
    histLabels = counts.map((_, i) => {
      const start = min + i * step
      const end = i === bins - 1 ? max : (min + (i + 1) * step)
      return `${start.toFixed(2)}–${end.toFixed(2)}`
    })
  }
  const weightsHistData = {
    labels: histLabels,
    datasets: [{
      label: 'Weights Histogram',
      data: histValues,
      backgroundColor: '#b39ddb'
    }]
  }

  // Schema type distribution (numeric/categorical/datetime/etc.)
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    Object.values(inferred_schema ?? {}).forEach((t: any) => {
      const key = String(t)
      counts[key] = (counts[key] ?? 0) + 1
    })
    return counts
  }, [inferred_schema])

  const typeLabels = Object.keys(typeCounts)
  const typeValues = Object.values(typeCounts)
  const palette = ['#7c4dff', '#ff6e6e', '#26c6da', '#66bb6a', '#ffa726', '#ab47bc']
  const typeData = {
    labels: typeLabels,
    datasets: [{
      data: typeValues,
      backgroundColor: typeLabels.map((_, i) => palette[i % palette.length]),
      borderWidth: 0
    }]
  }

  // Data health charts
  const missingPct = Math.min(100, Math.max(0, (missing_rate ?? 0) * 100))
  const outlierPct = row_count ? Math.min(100, Math.max(0, (outliers_detected ?? 0) / row_count * 100)) : 0
  const missingData = {
    labels: ['Present', 'Missing'],
    datasets: [{ data: [100 - missingPct, missingPct], backgroundColor: ['#e8f5e9', '#ef9a9a'], borderWidth: 0 }]
  }
  const outlierData = {
    labels: ['Normal', 'Outliers'],
    datasets: [{ data: [100 - outlierPct, outlierPct], backgroundColor: ['#e3f2fd', '#ffcc80'], borderWidth: 0 }]
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Quality Score</Typography>
          <Box display="flex" alignItems="center" justifyContent="center" height={220}>
            <Box position="relative" width={220}>
              <Doughnut data={qualityData} options={{ cutout: '70%', plugins: { legend: { display: false } } }} />
              <Box position="absolute" top={0} left={0} right={0} bottom={0} display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h4" fontWeight={700}>{quality_score}</Typography>
              </Box>
            </Box>
          </Box>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Chip label={`Missing: ${(missing_rate * 100).toFixed(2)}%`} size="small" />
            <Chip label={`Imputations: ${imputations_applied}`} size="small" />
            <Chip label={`Outliers: ${outliers_detected}`} size="small" />
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Dataset Overview</Typography>
          <Stack direction="row" spacing={2}>
            <Stat label="Rows" value={row_count} />
            <Stat label="Columns" value={column_count} />
            <Stat label="Domain" value={weighting?.domain ?? '—'} />
          </Stack>
          <Divider sx={{ my: 2 }} />
          {weightLabels.length > 0 ? (
            <Bar data={weightsData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
          ) : (
            <Typography color="text.secondary">Uniform weighting applied</Typography>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Schema Type Distribution</Typography>
          {typeLabels.length > 0 ? (
            <Box display="flex" alignItems="center" justifyContent="center" height={260}>
              <Box width={260}>
                <Doughnut data={typeData} options={{ plugins: { legend: { position: 'bottom' as const } } }} />
              </Box>
            </Box>
          ) : (
            <Typography color="text.secondary">No schema types available</Typography>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Data Health</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom>Missing Rate</Typography>
                <Box display="flex" alignItems="center" justifyContent="center" height={180}>
                  <Box position="relative" width={180}>
                    <Doughnut data={missingData} options={{ cutout: '70%', plugins: { legend: { display: false } } }} />
                    <Box position="absolute" top={0} left={0} right={0} bottom={0} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="h5" fontWeight={700}>{missingPct.toFixed(1)}%</Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom>Outlier Rate</Typography>
                <Box display="flex" alignItems="center" justifyContent="center" height={180}>
                  <Box position="relative" width={180}>
                    <Doughnut data={outlierData} options={{ cutout: '70%', plugins: { legend: { display: false } } }} />
                    <Box position="absolute" top={0} left={0} right={0} bottom={0} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="h5" fontWeight={700}>{outlierPct.toFixed(1)}%</Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {weightNumValues.length > 0 && (
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Weights Distribution (Histogram)</Typography>
            <Bar data={weightsHistData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
          </Paper>
        </Grid>
      )}

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Inferred Schema</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1 }}>
            {Object.entries(inferred_schema ?? {}).map(([name, typ]: any) => (
              <Box key={name} sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'grey.50', borderRadius: 1, px: 2, py: 1 }}>
                <Typography variant="body2" fontWeight={600}>{name}</Typography>
                <Chip label={typ} size="small" color={typ === 'numeric' ? 'primary' : (typ === 'datetime' ? 'success' : 'default')} />
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

function Stat({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, px: 2, py: 1 }}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="h6" fontWeight={700}>{value}</Typography>
    </Box>
  )
}
