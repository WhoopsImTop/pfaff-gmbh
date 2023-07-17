<template>
  <div class="content-container">
    <h2 v-if="component.title">{{ component.title }}</h2>
    <div class="team-grid">
      <div
        v-for="(teamMember, index) in component.teamMember"
        :key="index"
        class="team-member"
      >
        <div class="team-member-image">
          <img
            :src="
              teamMember.image ? teamMember.image : '/personal-pfaff-gmbh.jpg'
            "
            :alt="teamMember.name"
            :title="teamMember.name"
            loading="lazy"
          />
        </div>
        <div class="team-member-content">
          <span class="team-member-position">{{ teamMember.position }}</span>
          <h4>{{ teamMember.name }}</h4>
          <a v-if="teamMember.phone" :href="'tel:' + teamMember.phone.split('-').join('')">{{ teamMember.phone }}</a><br>
          <a v-if="teamMember.email" :href="'mailto:' + teamMember.email">{{ teamMember.email }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],
  created() {
    console.log(this.component)
  },
}
</script>

<style>
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 40px;
}

.team-member {
  display: flex;
  flex-direction: column;
}

.team-member-image {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.team-member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member-position {
  color: var(--darker-gray-color);
  display: block;
  text-transform: uppercase;
  margin: 10px 0 5px;
}
</style>