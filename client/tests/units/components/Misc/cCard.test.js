import { config, shallowMount } from '@vue/test-utils'
import cCard from "~/components/Misc/cCard.vue";

config.global.mocks = {
	$locale: key => key
}

test("should render default state", () => {
	const wrapper = shallowMount(cCard);
	const header = wrapper.find(".c-card-header");
	const content = wrapper.find(".c-card-content");
	const footer = wrapper.find(".c-card-footer");
	expect(header.exists()).toBe(false);
	expect(content.exists()).toBe(false);
	expect(footer.exists()).toBe(false);
})

test("should render title", () => {
	const wrapper = shallowMount(cCard, {
		props: {
			title: "Hello"
		}
	});
	const header = wrapper.find( ".c-card-header" );
	expect(header.exists()).toBe( true );
	expect(header.text()).toContain( "Hello" );
})

test("should render slots", () => {
	const wrapper = shallowMount(cCard, {
		slots: {
			"header-controls": "Controls Slot",
			"content": "Content Slot",
			"footer": "Footer Slot",
		}
	})
	const header = wrapper.find(".c-card-header");
	const content = wrapper.find(".c-card-content");
	const footer = wrapper.find(".c-card-footer");
	expect(header.exists()).toBe(true);
	expect(content.exists()).toBe(true);
	expect(footer.exists()).toBe(true);
	expect(header.text()).toContain( "Controls Slot" );
	expect(content.text()).toContain( "Content Slot" );
	expect(footer.text()).toContain( "Footer Slot" );
})